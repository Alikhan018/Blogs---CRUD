class Blogger {
  constructor() {
    this.setUpLocalStorage();
    this.setBlogs();
    this.setUpToggle();
  }

  setUpLocalStorage() {
    if (!localStorage.getItem("blogs")) {
      localStorage.setItem("blogs", JSON.stringify([]));
      const p = document.createElement("p");
      p.innerText = "No blogs posted yet";
      document.querySelector("section").appendChild(p);
    }
  }

  renderBlog(blog) {
    const div = document.createElement("div");
    const Div = document.createElement("div");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    const desc = document.createElement("span");
    const img = document.createElement("div");

    desc.innerText = blog.desc;
    h2.innerText = blog.blogTitle;
    h3.innerHTML = `- by ${blog.author}`;
    if (blog.img !== "") {
      console.log(blog.img)
      img.style.backgroundImage = `url('${blog.img}')`;
    } else {
      img.style.backgroundImage = `url('assets/images/noImage.jpg')`;
    }
    img.style.backgroundSize = `cover`;
    img.style.height = "600px";
    Div.append(h2, h3, desc);
    div.append(img, Div);
    Div.classList = "content";
    div.classList = "card";
    div.id = blog.id;
    const ParentDiv = document.getElementById("card-group");
    ParentDiv.appendChild(div);

    const ParentDivTwo = document.getElementById("all-blogs");
    const divTwo = document.createElement("div");
    const span = document.createElement("span");
    const a = document.createElement("a");
    span.innerText = `- by ${h3.innerText}`;
    a.innerText = `${h2.innerText}`;
    a.style.textDecoration = "none";
    a.style.color = "black";
    a.classList = "anchors";
    a.href = `http://127.0.0.1:5501/#${blog.id}`;
    divTwo.append(a, span);
    divTwo.classList = "side-card";
    ParentDivTwo.appendChild(divTwo);
  }
  setBlogs() {
    if (localStorage.getItem("blogs").length > 0) {
      const blogs = JSON.parse(localStorage.getItem("blogs"));
      blogs.map((blog) => this.renderBlog(blog));
    }
  }
  setUpToggle() {
    const hamburger = document.getElementById("hamburger");
    const div = document.getElementById("all-blogs");
    const a = document.getElementsByClassName("anchors");
    hamburger.onclick = function () {
      if (div.classList.contains("show")) {
        setTimeout(() => {
          div.style.right = "-500px";
        }, 400);
        hamburger.classList.remove("icon");
        hamburger.classList.remove("fixed-right");
        div.classList.remove("show");
        div.classList.add("hide");
      } else {
        setTimeout(() => {
          div.style.right = "0px";
        }, 400);
        hamburger.classList.add("icon");
        hamburger.classList.add("fixed-right");
        div.classList.remove("hide");
        div.classList.add("show");
        for (let i = 0; i < a.length; i++) {
          a[i].onclick = function () {
            setTimeout(() => {
              div.style.right = "-500px";
            }, 400);
            hamburger.classList.remove("icon");
            hamburger.classList.remove("fixed-right");
            div.classList.remove("show");
            div.classList.add("hide");
          };
        }
      }
    };
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Blogger();
});
