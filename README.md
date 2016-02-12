# Image Gallery
The simplest image gallery you'll ever come across

# Requirements

- Pictures
- a PHP web server

# Installing

- Download this repository on your server in a web accessible directory
- make the `cache` directory writable
- `composer install`
- The easiest way to make it work is to make a symlink in the web folder with the name `images` that points to all your pictures
- Point your browser to the web folder. (the first page load might take some time as it caches the list of your galleries)
- Enjoy !

# Adding pictures

As a cache is created on first viewing, your new pictures won't appear.
To solve that go to the `cache` directory and remove its content.

When you load one page of the gallery, it will create a new cache.

## Tweaking the configuration

If you want to let your images, out of the main folder, you can tweak the `src/php/config.php` file.

## Technologies

- ReactJS
- React Gallery
- [Slim framework](http://www.slimframework.com/) powers the server side.
- [Imagecache](https://github.com/onigoetz/imagecache) generates the thumbnails. 
