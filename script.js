const search = () => {
    let uri = "https://api.dictionaryapi.dev/api/v2/entries/en/" + query.value
    console.log(uri)
    fetch(uri)
        .then(response => {
            if (response.status == 404) {
                alert("Sorry, can't find the meaning of that! Try another word...")
            }

            return response.json();
        }
        )
        .then(resp => {
            for (let i of resp[0]["phonetics"]) {
                if (i.text != null) {
                    var phonetics = i.text
                }
            }


            let meanings = resp[0]["meanings"]
            // console.log(phonetics)
            let synonymns = []
            let antonyms = []
            let def = {}

            for (let meaning of meanings) {

                if (meaning.synonymns != null) synonymns.push(meaning.synonymns[0])
                if (meaning.antonyms != null) antonyms.push(meaning.antonyms[0])

                var partsOfSpeech = meaning["partOfSpeech"]
                for (let i of meaning["definitions"]) {
                    if (Object.keys(def).length == 0) Object.assign(def, { [partsOfSpeech]: i["definition"] })
                }

            }
            console.log(def)


            console.log(synonymns)
            console.log(antonyms[0])
            word_box.textContent = query.value
            phonetics_box.textContent = phonetics
            synonyms_box.textContent = `${synonymns.length != 0 && antonyms[0] != undefined ? synonymns[0] : "No synonyms found"}`
            antonyms_box.textContent = `${antonyms.length != 0 && antonyms[0] != undefined ? antonyms[0] : "No antonyms found"}`
            parts_of_speech_box.textContent = Object.keys(def)[0]
            meaning_box.textContent = def[Object.keys(def)[0]]
            result.classList.remove("blur-lg");


            // return { phonetics, definitions, synonymns, antonyms }


            // let box = document.getElementById("box")
            // box.style += "display:block;"
            // copyLink(pasteLink.replace("/p/", "/d/"))
            // document.getElementById("copyBtn").href = pasteLink.replace("/p/", "/d/")

        })
        .catch(err => {
            console.log('Fetch Error :-S', err);
        });
}

searchBtn.addEventListener("click", search)