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

