const search = () => {
    let uri = "https://api.dictionaryapi.dev/api/v2/entries/en/" + query.value
    console.log(uri)
    fetch(uri)
        .then(response => {
            if (response.status == 404) {
                // update display as not found
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
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
            let definitions = []
            for (let meaning of meanings) {
                // console.log(meaning)

                let defs = []
                if (meaning.synonymns != null) synonymns.push(meaning.synonymns)
                if (meaning.antonyms != null) antonyms.push(meaning.antonyms)

                var partsOfSpeech = meaning["partOfSpeech"]
                for (let i of meaning["definitions"]) {
                    defs.push(i.definition)
                }
                Object.assign(definitions, { [partsOfSpeech]: defs })
            }
            
            console.log(phonetics)
            console.log(synonymns)
            console.log(antonyms)
            console.log(definitions)
            // console.log(typeof definitions)
    
            for (let k of definitions) {
                    console.log("hi")
                    console.log(k)
                    alert("hi")
                }
            
            
            word_box.textContent = query.value
            phonetics_box.textContent = phonetics
            synonyms_box.textContent = synonymns
            antonyms_box.textContent = antonyms

            

            return {phonetics, definitions, synonymns, antonyms }


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