export const formatCurrencyVND = (value: number): string =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(value);

export const LoaddingRender = (check: boolean) => {
  if (check) {
    const space = document.querySelector(
      "#LoaddingRender #space"
    ) as HTMLElement;
    if (space) {
      space.style.zIndex = "1000";
    }
  } else {
    const space = document.querySelector(
      "#LoaddingRender #space"
    ) as HTMLElement;
    if (space) {
      space.style.zIndex = "-1";
    }
  }
};
