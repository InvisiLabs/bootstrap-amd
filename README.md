bootstrap-amd
=============

AMDifier for Bootstrap JS plugins

Usage
-----

You can download and use this script manually:

```bash
$ git clone https://github.com/InvisiLabs/bootstrap-amd
$ node bootsrap-amd/main.js path/to/bootstrap
```

... or hook it into Bower's package installation process, so every time you install or update `bootstrap` or `bootstrap-amd`, it will populate AMD versions of Bootstrap plugins. In order do this, create `.bowerrc` in your project's root directory with following contents:

```json
{
    "scripts": {
        "postinstall": "bash -c \"(echo '%' | grep -Eq '\\bbootstrap(-amd)?\\b') && node bower_components/bootstrap-amd/main.js bower_components/bootstrap\""
    }
}
```

... and then install package using Bower:

```bash
$ bower install bootstrap-amd
```

Configuring AMD loader (RequireJS)
----------------------------------

```javascript
requirejs.config({
    paths: {
        bootstrap: 'bower_components/bootstrap-amd/js'
    }
});
```

Referencing Bootstrap plugins from your module
----------------------------------------------

```javascript
define(['jquery', 'bootstrap/tooltip'], function ($) {
    $('#some-selector').tooltip();
});
```

