$("#number_form").submit(function (event) {
  event.preventDefault();
  async function getFavoriteNumberFact() {
    let favoriteNumber = $("#number_input").val();
    if (favoriteNumber.indexOf(" ") === -1) {

      console.log('the number is', favoriteNumber)
      const res = await axios.get(`http://numbersapi.com/${favoriteNumber}?json`)
      console.log(res)
      // $("#number_fact").text(res.data.text);

      let fourFacts = [];

      for (let i = 0; i < 4; i++) {
        fourFacts.push(
          await axios.get(`http://numbersapi.com/${favoriteNumber}?json`)
        );
        console.log(fourFacts)
      }
      $("#number_fact").empty()
      for (let fact of fourFacts) {
        $("#number_fact").append(`<p>${fact.data.text}</p>`);
      }
    } else {
      arr = favoriteNumber.split(" ");
      $("#number_fact").empty();
      for (let i = 0; i < arr.length; i++) {
        res=await axios.get(`http://numbersapi.com/${arr}?json`)
        let val = parseInt(arr[i]);
        $("#number_fact").append(`<p>${res.data[val]}</p>`);
      }
    }
  }
  getFavoriteNumberFact()
})
