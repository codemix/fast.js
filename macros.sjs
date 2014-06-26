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

macro (fast-map) {
  case { $ctx $source into $into ($value:ident, $key:ident, $original:ident) { $body...} } => {
    var name = makeIdent('return', #{ $ctx });
    letstx $name = [name];
    return #{
      var $original = $source,
          length = $original.length,
          $into = new Array(length),
          $key, $value;
      macro $name {
        rule { $e:expr } => {
          $into[i] = $e
        }
      }
      for ($key = 0; $key < length; $key++) {
        $value = $original[$key];
        $body...
      }
    };
  }
  case { $ctx $source ($value:ident, $key:ident, $original:ident) { $body...} } => {
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
  case { $ctx $source into $into ($value:ident, $key:ident) { $body...} } => {
    var name = makeIdent('return', #{ $ctx });
    letstx $name = [name];
    return #{
      var source = $source,
          length = source.length,
          $into = new Array(length),
          $key, $value;
      macro $name {
        rule { $e:expr } => {
          $into[$key] = $e
        }
      }
      for ($key = 0; $key < length; $key++) {
        $value = source[$key];
        $body...
      }
    };
  }
  case { $ctx $source ($value:ident, $key:ident) { $body...} } => {
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
  case { $ctx $source into $into ($value:ident) { $body...} } => {
    var name = makeIdent('return', #{ $ctx });
    letstx $name = [name];
    return #{
      var source = $source,
          length = source.length,
          $into = new Array(length),
          i, $value;
      macro $name {
        rule { $e:expr } => {
          $into[i] = $e
        }
      }
      for (i = 0; i < length; i++) {
        $value = source[i];
        $body...
      }
    };
  }
  case { $ctx $source ($value:ident) { $body...} } => {
    var name = makeIdent('return', #{ $ctx });
    letstx $name = [name];
    return #{
      (function (source) {
        var length = source.length,
            result = new Array(length),
            i, $value;
        macro $name {
          rule { $e:expr } => {
            result[i] = $e
          }
        }
        for (i = 0; i < length; i++) {
          $value = source[i];
          $body...
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

