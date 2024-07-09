const apikey='9e45da6c8dd148e5969570b2ce63c2e6';

const blogcontainer=document.getElementById("blog-container");
const searchfield=document.getElementById("search-input")
const searchbutton=document.getElementById("search-button")

async function fetchrandomnews(){
    try{
        const apiurl=`https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`
        const response=await fetch(apiurl)
        const data=await response.json()
        return data.articles; //for showing the data
    }catch(error){
        console.error("Error fetching random news",error)
        return []
    }
}

searchbutton.addEventListener('click',async()=>{
    const query=searchfield.value.trim()
    if(query!==""){
        try{
            const articles=await fetchnewsquery(query)
            displayblogs(articles)
        }catch(error){
            console.log("Error Fetching news by query",error)
        }
    }
})

async function fetchnewsquery(query){
    try{
        const apiurl=`https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`
        const response=await fetch(apiurl);
        const data=await response.json();
        return data.articles; //for showing the data
    }catch(error){
        console.error("Error fetching random news",error)
        return []
    }
}
//will generate our cards
function displayblogs(articles){
    //to remove previously fetched data and replace with newest one
    blogcontainer.innerHTML=""
    articles.forEach((article)=>{
        const blogcard=document.createElement("div");
        blogcard.classList.add("blog-card")
        const img=document.createElement("img")
        img.src=article.urlToImage
        img.alt=article.title
        const title=document.createElement("h2")
        const truncatedtitle=article.title.length>30?article.title.slice(0,30) + "..." : article.title;
        title.textContent=truncatedtitle;
        const description=document.createElement("p")
        const truncateddesc=article.description.length>120?article.description.slice(0,120) + "...." : article.description;
        description.textContent=truncateddesc;

        blogcard.appendChild(img);
        blogcard.appendChild(title);
        blogcard.appendChild(description);
        blogcard.addEventListener('click',()=>{
            window.open(article.url,"_blank");
        })
        blogcontainer.appendChild(blogcard);
    })
}

//to initiate the function
(async ()=>{
    try{
        //to fetch random news we're using await
        const articles=await fetchrandomnews()
        displayblogs(articles);
    }catch(error){
        console.error("Error fetching random news",error)
    }
})();