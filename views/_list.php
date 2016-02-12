<?php

if (!count($data)) {
    return '';
}

?>
<section class="Gallery">

<?php foreach ($data as $folder): ?>

        <?php if ($folder->getType() == 'tome'): ?>
            <a class="Gallery__item" href="<?= url('book/' . $folder->getPath()) ?>">

                <img class="Gallery__image" src="<?= image('small', $folder->getThumb()) ?>" width=60 height=75 />
                <span class="Gallery__text"><?= $folder->getName() ?></span>

            </a>
        <?php else: ?>
            <?php if ($folder->count()): ?>
                <a class="Gallery__item" href="<?= url('list/' . $folder->getPath()) ?>">
                    <div>
                        <img class="Gallery__image" src="<?= image('small', $folder->getThumb()) ?>" width=60 height=75 />
                        <span class="Gallery__text">
                            <?= $folder->getName() ?>
                            <small><?= $folder->count() ?> Galleries</small>
                        </span>
                    </div>
                </a>
            <?php endif; ?>
        <?php endif; ?>

<?php endforeach; ?>
</section>
