<?php
use Imagine\Image\Box;

function getBreadCrumb($parent, $title)
{
    $breadbcrumb = [];

    if ($parent) {
        $parents = [$parent];
        while ($parent = $parent->getParent()) {
            $parents[] = $parent;
        }

        $parents = array_reverse($parents);

        $breadbcrumb = array_map(
            function (Node $item) {
                $url = $item instanceof Root ? "" : "list/{$item->getPath()}";
                return ['url' => url($url), 'title' => $item->getName()];
            },
            $parents
        );
    }

    $breadbcrumb[] = ['title' => $title];

    return $breadbcrumb;
}


$app->get(
    '/',
    function () use ($app) {
        return $app->render('index.php');
    }
);

$app->get(
    '/api/list/:list',
    function ($query) use ($app) {

        $gallery = getGallery();
        $parent = null;
        $title = "Home";
        if ($query == '') {
            $data = $gallery->getChildren();
        } else {
            $query = standardize_unicode($query);
            $data = search($gallery, $query);
            $parent = $data[0]->getParent()->getParent();
            $end = explode('/', $query);
            $title = end($end);
        }

        foreach ($data as $key => $row) {
            $names[$key] = ucfirst($row->getName());
        }
        array_multisort($names, SORT_ASC, $data);

        \SlimJson\Middleware::inject();
        return $app->render(
            200,
            [
                'data' => [
                    'title' => $title,
                    'data' => array_map(function ($item) { return $item->toArray(); }, $data),
                    'breadcrumb' => getBreadcrumb($parent, $title)
                ]
            ]
        );
    }
)->conditions(array('list' => '.*'));

$app->get(
    '/api/gallery/:book',
    function ($book) use ($app) {
        $book = standardize_unicode($book);

        //Get the pages
        $pages = array();
        $path = GALLERY_ROOT . '/' . $book;

        $it = new DirectoryIterator($path);
        foreach ($it as $item) {
            if (!in_array(strtolower($item->getExtension()), ['jpg', 'jpeg', 'png', 'gif']) || $item->isDir()) {
                continue;
            }

            $fullPath = "$path/{$item->getFilename()}";

            // Quick size getter, instead of Imagine
            // which does a lot of processing that
            // is not useful for us
            $data = getimagesize($fullPath);
            if (false === $data) {
                throw new RuntimeException(sprintf('Failed to get image size for %s', $fullPath));
            }
            $size = (new Box($data[0], $data[1]))->widen(BIG_WIDTH);

            $src = str_replace(GALLERY_ROOT, '', $fullPath);

            $pages[] = [
                'src' => image('medium', $src),
                'width' => $size->getWidth(),
                'height' => $size->getHeight(),
                'aspectRatio' => $size->getWidth() / $size->getHeight(),
                'lightboxImage' => [
                    'src' => image('big', $src),
                ]
            ];
        }

        $ps = array();
        foreach ($pages as $key => $page) {
            $ps[$key] = $page['src'];
        }
        array_multisort($ps, SORT_NATURAL, $pages);

        $parent_folder = search(getGallery(), dirname($book));
        $parent = $parent_folder[0]->getParent();

        $end = explode('/', $book);
        $title = end($end);

        \SlimJson\Middleware::inject();
        return $app->render(
            200,
            [
                'data' => [
                    'title' => $title,
                    'data' => $pages,
                    'breadcrumb' => getBreadcrumb($parent, $title)
                ]
            ]
        );

    }
)->conditions(array('book' => '.*'));


$app->get(
    '/:catchall',
    function () use ($app) {
        return $app->render('index.php');
    }
)->conditions(array('catchall' => '.*'));

