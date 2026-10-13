<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <BaseLogo :size="24" />
      <p class="footer__text">
        &copy; 2026 Test assignment. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  min-height: 40px;
  color: $color-text-muted;
  background: $color-footer;
  border-top: 1px solid $color-border;
  border-radius: 16px 16px 0 0;
  transition:
    background $transition-time,
    color $transition-time,
    border-color $transition-time;

  @include respond-to($bp-tablet) {
    min-height: 60px;
  }

  &__wrapper {
    @include container;

    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: inherit;
  }

  &__text {
    font-size: 14px;
  }
}
</style>
