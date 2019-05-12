// selecting tags
const inpt = document.querySelector("#search-input"),
btn = document.querySelector("#search-button"),
content = document.querySelector(".container");

// a function to clearing data
function cleardata() {
  content.innerHTML = '';
}

// getting API from Github
function getApi() {
  if (inpt.value) {
    content.classList.add('loading'); // loading before showing the results

    fetch(`https://api.github.com/search/repositories?q=${inpt.value}`).
    then(res => {

      // make sure that we get api data
      if (res.status === 200) {
        return res.json();
      }

      // else for handeling errors
      else {
          content.innerHTML = `<div class="hint">Oops we have some problems, Lets try again</div>`;
          console.log(`error is: ${res.status}`);
          content.classList.remove('loading');
          return;
        }
    })

    // showing results as cards
    .then(rslt => {
      let html = '<div>';
      for (const item of rslt.items) {
        html += `
          <div class="card">
            <img src="${item.owner.avatar_url}">
            <div class="repdata">
              <a 
                href="${item.html_url}"
                target="_blank"
                class="repname"
              >${item.name}</a>
              <div class="owner">Owner: ${item.owner.login}</div>
            </div>
          </div>
        `;
      }
      html += '</div>';

      // remove loading before showing results
      content.classList.remove('loading');
      content.innerHTML = html;}).

    catch(err => {
      // error handeling
      console.log('error in Fetching:', err);
    });
  }
}

// events handeling
btn.addEventListener('click', getApi);
inpt.addEventListener('keypress', e => {
  // when i hit enter
  var key = e.which || e.keyCode;
  if (key === 13) {
    getApi();
  }
});