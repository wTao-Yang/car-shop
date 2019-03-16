

export default function _message(message = "hello", color = "success") {
  this.$store.commit("colorMes", color);
  this.$store.commit("messageMes", message);
  this.$store.commit("openMES", true);
}