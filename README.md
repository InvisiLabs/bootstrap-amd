Bootstrap-AMD
=============

AMD-ready versions of Bootstrap jQuery plugins

Installing
------------

```bash
$ bower install bootstrap-amd --save
```

Configuring AMD loader (RequireJS)
----------------------------------

```javascript
requirejs.config({
    packages: [
        {
            name: 'jquery',
            location: 'bower_components/jquery/src',
            main: 'jquery'
        }, {
            name: 'sizzle',
            location: 'bower_components/jquery/src/sizzle/dist',
            main: 'sizzle'
        }, {
            name: 'bootstrap',
            location: 'bower_components/bootstrap-amd/lib',
            main: 'bootstrap'
        }
    ]
});
```

Referencing Bootstrap plugins from your module
----------------------------------------------

You can require particular modules

```javascript
define(['jquery/core/init', 'bootstrap/tooltip', 'bootstrap/modal'], function ($) {
    $('[data-toggle="tooltip"]').tooltip();
    $('#my-modal').modal();
});
```

... or `bootstrap` meta-module to load all plugins

```javascript
define(['jquery/core/init', 'bootstrap'], function ($) {
    $('[data-toggle="tooltip"]').tooltip();
    $('#my-modal').modal();
});
```

Versioning
----------

Bootstrap-AMD uses [Semantic Versioning](http://semver.org) with build
metadata (e.g. `1.0.0+bootstrap.3.3.4`) to indicate Bootstrap version
the code is based on.

