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