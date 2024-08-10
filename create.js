class CreateBlog {
  constructor() {
    this.submit();
    this.limitCheck();
    this.loadimg();
  }
  submit() {
    const form = document.querySelector("form");
    let blogArray = localStorage.getItem("blogs");
    blogArray = JSON.parse(blogArray);
    form.addEventListener("submit", (e) => {
      const wordsLowerLimit = 200;
      const wordsUpperLimit = 3000;
      e.preventDefault();
      const [author, blogTitle, Img] = document.querySelectorAll("input");
      const textArea = document.querySelector("textarea");
      const inputs = textArea.value.trim().split(/\s+/);
      let wordCount = inputs.length;
      if (wordCount < wordsLowerLimit || wordCount > wordsUpperLimit) {
        const p = document.createElement("p");
        p.innerText = "Invalid number of words";
        p.style.color = "red";
        form.appendChild(p);
        return;
      }
      const Id = blogArray.length + 1;
      const reader = new FileReader();
      let image = Img.files[0];
      let url = "";
      reader.addEventListener("load", () => {
        url = reader.result;
        blogArray.push({
          id: Id,
          author: author.value,
          blogTitle: blogTitle.value,
          desc: textArea.value,
          img: url,
        });
        localStorage.setItem("blogs", JSON.stringify(blogArray));
      });
      reader.readAsDataURL(image);
      location.reload();
    });
  }
  limitCheck(wordsLowerLimit, wordsUpperLimit) {
    const textArea = document.querySelector("textarea");
    const count = document.getElementById("words");
    let wordCount = 0;
    textArea.addEventListener("input", () => {
      const inputs = textArea.value.trim().split(/\s+/);
      wordCount = inputs.filter((input) => input.length > 0).length;
      if (wordCount < wordsLowerLimit || wordCount > wordsUpperLimit) {
        textArea.style.border = `1px solid red`;
      } else {
        textArea.style.border = `1px solid black`;
      }
      count.innerText = `Words: ${wordCount}`;
    });
    return wordCount;
  }
  loadimg() {
    const im = document.getElementById("top-img");
    const image = document.getElementById("blogImage");
    image.addEventListener("change", () => {
      const reader = new FileReader();
      let images = image.files[0];
      reader.addEventListener("load", () => {
        im.src = reader.result;
      });
      reader.readAsDataURL(images);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new CreateBlog();
});
