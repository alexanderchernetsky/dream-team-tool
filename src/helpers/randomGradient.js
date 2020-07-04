const gradients = [
  {
    gradient: "linear-gradient(90deg, #FFC7B6 0%, #FF65A6 100%)",
    buttonColor: "#FF79A9",
  },
  {
    gradient: "linear-gradient(90deg, #F8A5FF 0%, #BD0094 100%)",
    buttonColor: "#CB27AD",
  },
  {
    gradient: "linear-gradient(90deg, #A5C9FF 0%, #8B2CEB 100%)",
    buttonColor: "#9151EF",
  },
  {
    gradient: "linear-gradient(90deg, #A5E9FF 0%, #0065DC 100%)",
    buttonColor: "#2381E3",
  },
  {
    gradient: "linear-gradient(90deg, #FFACCF 0%, #F9683A 100%)",
    buttonColor: "#FA775C",
  },
  {
    gradient: "linear-gradient(90deg, #F0FF7A 0%, #C0FB18 100%)",
    buttonColor: "#CBFB2F",
  },
  {
    gradient: "linear-gradient(90deg, #A5AEFF 0%, #14D5B2 100%)",
    buttonColor: "#37CBC4",
  },
  {
    gradient: "linear-gradient(90deg, #B9FF61 0%, #00E9CD 100%)",
    buttonColor: "#2BEEB3",
  },
  {
    gradient: "linear-gradient(90deg, #97FFE6 0%, #00D6E3 100%)",
    buttonColor: "#22DFE4",
  },
];

const randomGradient = () => {
  return gradients[Math.floor(Math.random() * gradients.length)];
};

export default randomGradient;
