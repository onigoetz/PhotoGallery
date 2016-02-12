<header class="Breadcrumb">
    <?php
    $original_parent = $parent;
    $parents = [$parent];

    while ($parent = $parent->getParent()) {
        $parents[] = $parent;
    }

    $parents = array_reverse($parents);
    $parent = $original_parent;

    $content = array_map(function(Node $item) {
        $url = $item instanceof Root ? "" : "list/{$item->getPath()}";
        return "<a href=\"" . url($url) . "\" class=Breadcrumb__link> {$item->getName()}</a>\n";
    }, $parents);

    echo implode("<span class=Breadcrumb__separator>&gt;</span>", $content);
    ?>
    <span class=Breadcrumb__separator>&gt;</span>
    <span class=Breadcrumb__current><?= $title; ?></span>
</header>
