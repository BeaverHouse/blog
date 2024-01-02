import mediumZoom from "medium-zoom";

document.addEventListener(
  "lazybeforeunveil",
  () => {
    const zoom = mediumZoom("#zoom-default", {
      margin: 10,
      background: "rgba(00, 00, 00, .3)",
      scrollOffset: 0,
    });
    zoom.on("close", (event) => {
      const elements = document.getElementsByClassName("medium-zoom-overlay");
      while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
      }
      mediumZoom("#zoom-default", {
        margin: 10,
        background: "rgba(00, 00, 00, .3)",
        scrollOffset: 0,
      });
    });
  },
  { once: true }
);
