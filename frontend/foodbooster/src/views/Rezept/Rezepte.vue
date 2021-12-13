<template>

  <h1>Rezepte</h1>
  <ui-image-list type="masonry" :text-protection="labelsType === 2">
    <ui-grid class="demo-grid">

      <ui-grid-cell v-for="(item, index) in 12"
                    :key="index" columns="3" class="demo-cell">

        <ui-image-item

            :image="require(`@/assets/Food1.jpg`)"

        >
          <ui-image-text v-if="labelsType">
            Rezept {{ index + 1 }}
            <template #action>
              <ui-icon-button icon="favorite_border"></ui-icon-button>
              <ui-icon-button icon="favorite"></ui-icon-button>
            </template>
          </ui-image-text>
        </ui-image-item>
      </ui-grid-cell>


    </ui-grid>
  </ui-image-list>
</template>

<script>
export default {
  data() {
    return {
      labelsType: 1
    };
  }
};
</script>

<style lang="scss" scoped>

$standard-gutter-size: 4px;
$masonry-gutter-size: 16px;
$icon-size: 24px;
$text-protection-background-color: rgba(0, 0, 0, 0.6);
$text-protection-height: 48px;
$text-protection-horizontal-padding: 16px;
$shape-radius: 0


</style>
