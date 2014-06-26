macro (fast-clone) {
  rule {
    $subject as $target ;...
  } => {
    var source = $subject;
    if (!source || typeof source !== 'object') {
      var $target = source;
    }
    else if (Array.isArray(source)) {
      var length = source.length,
          $target = new Array(length),
          i;
      for (i = 0; i < length; i++) {
        $target[i] = source[i];
      }
    }
    else {
      var keys = Object.keys(source),
          length = keys.length,
          $target = {},
          key, i;
      for (i = 0; i < length; i++) {
        key = keys[i];
        $target[key] = source[key];
      }
    }
  }
}

macro (fast-clone-array) {
  rule {
    $subject as $target ;...
  } => {
    var source = $subject,
        length = source.length,
        $target = new Array(length),
        i;
    for (i = 0; i < length; i++) {
      $target[i] = source[i];
    }
  }
}

macro (fast-clone-object) {
  rule {
    $subject as $target ;...
  } => {
    var source = $subject,
        keys = Object.keys(source),
        length = keys.length,
        $target = {},
        key, i;
    for (i = 0; i < length; i++) {
      key = keys[i];
      $target[key] = source[key];
    }
  }
}

export (fast-clone);
export (fast-clone-object);
export (fast-clone-array);

macro (fast-each) {
  // fast-each [key value] in array { ... }
  rule {
    [ $key:ident $value:ident ] in $in { $body... }
  } => {
    var source = $in,
        length = source.length,
        $key, $value;
    for ($key = 0; $key < length; $key++) {
      $value = source[$key];
      $body...
    }
  }
  // fast-each [value] in array { ... }
  rule {
    [ $value:ident ] in $in { $body... }
  } => {
    var source = $in,
        length = source.length,
        i, $value;
    for (i = 0; i < length; i++) {
      $value = source[i];
      $body...
    }
  }
  // fast-each {key value} in object { ... }
  rule {
    { $key:ident $value:ident } in $in { $body... }
  } => {
    var source = $in,
        keys = Object.keys(source),
        length = keys.length,
        i, $key, $value;
    for (i = 0; i < length; i++) {
      $key = keys[i];
      $value = source[$key];
      $body...
    }
  }
  // fast-each {value} in object { ... }
  rule {
    { $value:ident } in $in { $body... }
  } => {
    var source = $in,
        keys = Object.keys(source),
        length = keys.length,
        i, key, $value;
    for (i = 0; i < length; i++) {
      key = keys[i];
      $value = source[key];
      $body...
    }
  }
}

export (fast-each);

var mapInvokeCounter = 0;

macro (fast-map) {
  // fast-map things as others (item, key, list) { return item + 1; }
  case { $ctx $source as $as ($value:ident, $key:ident, $original:ident) { $body...} ;... } => {
    var name = makeIdent('return', #{ $ctx });
    letstx $name = [name];
    return #{
      var $original = $source,
          length = $original.length,
          $as = new Array(length),
          $key, $value;
      macro $name {
        rule { $e:expr } => {
          $as[$key] = $e
        }
      }
      for ($key = 0; $key < length; $key++) {
        $value = $original[$key];
        $body...
      }
    };
  }
  // var others = fast-map things (item, key, list) { return item + 1; }
  case { $ctx $source ($value:ident, $key:ident, $original:ident) { $body...} ;... } => {
    var name = makeIdent('return', #{ $ctx });
    letstx $name = [name];
    return #{
      (function ($original) {
        var length = $original.length,
            result = new Array(length),
            $key, $value;
        macro $name {
          rule { $e:expr } => {
            result[$key] = $e
          }
        }
        for ($key = 0; $key < length; $key++) {
          $value = $original[$key];
          $body...
        }
        return result;
      })($source)
    };
  }
  // fast-map things as others (item, key) { return item + 1; }
  case { $ctx $source as $as ($value:ident, $key:ident) { $body...} ;... } => {
    var name = makeIdent('return', #{ $ctx });
    letstx $name = [name];
    return #{
      var source = $source,
          length = source.length,
          $as = new Array(length),
          $key, $value;
      macro $name {
        rule { $e:expr } => {
          $as[$key] = $e
        }
      }
      for ($key = 0; $key < length; $key++) {
        $value = source[$key];
        $body...
      }
    };
  }
  // var others = fast-map things (item, key) { return item + 1; }
  case { $ctx $source ($value:ident, $key:ident) { $body...} ;... } => {
    var name = makeIdent('return', #{ $ctx });
    letstx $name = [name];
    return #{
      (function (source) {
        var length = source.length,
            result = new Array(length),
            $key, $value;
        macro $name {
          rule { $e:expr } => {
            result[$key] = $e
          }
        }
        for ($key = 0; $key < length; $key++) {
          $value = source[$key];
          $body...
        }
        return result;
      })($source)
    };
  }
  // fast-map things as others (item) { return item + 1; }
  case { $ctx $source as $as ($value:ident) { $body...} ;... } => {
    var name = makeIdent('return', #{ $ctx });
    letstx $name = [name];

    // super ugly hack to enforce hygiene on the generated identifier
    global.fastMapInvocations = global.fastMapInvocations || 0;

    var i = makeIdent('i$fmap'+(global.fastMapInvocations++), #{ $ctx });
    letstx $i = [i];

    return #{
      var source = $source,
          length = source.length,
          $as = new Array(length),
          $i, $value;
      macro $name {
        rule { $e:expr } => {
          $as[$i] = $e
        }
      }
      for ($i = 0; $i < length; $i++) {
        $value = source[$i];
        $body...
      }
    };
  }
  // var others = fast-map things (item) { return item + 1; }
  case { $ctx $source ($value:ident) { $body...} ;... } => {
    var name = makeIdent('return', #{ $ctx });
    letstx $name = [name];


    // super ugly hack to enforce hygiene on the generated identifier
    global.fastMapInvocations = global.fastMapInvocations || 0;

    var i = makeIdent('i$fmap'+(global.fastMapInvocations++), #{ $ctx });
    letstx $i = [i];

    return #{
      (function (source) {
        var length = source.length,
            result = new Array(length),
            $i, $value;
        macro $name {
          rule { $e:expr } => {
            result[$i] = $e
          }
        }
        for ($i = 0; $i < length; $i++) {
          $value = source[$i];
          $body...
        }
        return result;
      })($source)
    };
  }
  // fast-map things as others (function (item) { return item + 1; })
  case { $ctx $source as $as $fn ;... } => {
    return #{
      var source = $source,
          length = source.length,
          $as = new Array(length),
          i;

      for (i = 0; i < length; i++) {
        $as[i] = $fn(source[i], i, source);
      }
    };
  }
  // var others = fast-map things (function (item) { return item + 1; })
  case { $ctx $source ($value:ident) $fn ;... } => {
    return #{
      (function (source) {
        var length = source.length,
            result = new Array(length),
            i;

        for (i = 0; i < length; i++) {
          result[i] = $fn(source[i], i, source)
        }
        return result;
      })($source)
    };
  }
}

export (fast-map);

macro (fast-slice) {
  rule {
    $source:ident to $to as $target ;...
  } => {
    var length = $source.length,
        $target = new Array(length),
        i;
    for (i = 0; i < $to && i < length; i++) {
      $target[i] = $source[i];
    }
  }
  rule {
    $source to $to as $target ;...
  } => {
    var reference = $source,
        length = reference.length,
        $target = new Array(length),
        i;
    for (i = 0; i < $to && i < length; i++) {
      $target[i] = reference[i];
    }
  }
  rule {
    $source:ident from $from as $target ;...
  } => {
    var length = $source.length,
        $target = new Array(length),
        i;
    for (i = $from; i < length; i++) {
      $target[i] = $source[i];
    }
  }
  rule {
    $source from $from as $target ;...
  } => {
    var reference = $source,
        length = reference.length,
        $target = new Array(length),
        i;
    for (i = $from; i < length; i++) {
      $target[i] = reference[i];
    }
  }
  rule {
    $source:ident from $from to $to as $target ;...
  } => {
    var length = $source.length,
        $target = new Array(length),
        i;
    for (i = $from; i < $to && i < length; i++) {
      $target[i] = $source[i];
    }
  }
  rule {
    $source from $from to $to as $target ;...
  } => {
    var reference = $source,
        length = reference.length,
        $target = new Array(length),
        i;
    for (i = $from; i < $to && i < length; i++) {
      $target[i] = reference[i];
    }
  }
  rule {
    $source:ident as $target ;...
  } => {
    var length = $source.length,
        $target = new Array(length),
        i;
    for (i = 0; i < length; i++) {
      $target[i] = $source[i];
    }
  }
  rule {
    $source as $target ;...
  } => {
    var reference = $source,
        length = reference.length,
        $target = new Array(length),
        i;
    for (i = 0; i < length; i++) {
      $target[i] = reference[i];
    }
  }
}


export (fast-slice);

