class compiler{

    constructor(startElement){
      let body = document.getElementById(startElement);
      this.root = [body];
      this.lastroot = null;
      this.func = [];
    }
    
    getElement(tag){
      return document.createElement(tag);
    }
    
    handelElement(line){
      if (line == "{"){
        this.root.push(this.lastroot);
      } else if(line == "}"){
        this.root.pop();
      } else{
        this.createElement(line);
      }
    }
    
    style(element, attributs){
      let attribut = attributs.split(",");
      for (let i = 0; i < attribut.length; i++){
        let c = attribut[i].split("=");
        element.style[c[0]] = c[1];
      }
    }
    
    getString(string, startc, endc){
      if (string.indexOf(startc) == -1 || string.indexOf(endc) == -1){
        return string;
      }
      let newstring = "";
      let start = false;
      for (let i = 0; i < string.length; i++){
        if (string[i] == endc){
          start = false;
        }
        if (start){
          newstring += string[i];
        }
        if (string[i] == startc){
          start = true;
        }    
      }
      return newstring;
    }
    
    removestring(string, startc, endc){
      if (string.indexOf(startc) == -1 || string.indexOf(endc) == -1){
        return string;
      }
      let newstring = "";
      let start = true;
      for (let i = 0; i < string.length; i++){
        if (string[i] == startc){
          start = false;
        }
        if (start){
          newstring += string[i]; 
        }
        if (string[i] == endc){
          start = true;
        }
      }
      return newstring;
    }
  
      createElement(line){
      let c = line.split("->");
      let tag = c[0];
      let attributs2 = c[1];
      let attributs = [];
      
      let style = this.getString(attributs2, "(", ")");
      attributs2 = this.removestring(attributs2, "(", ")");
      attributs = attributs2.split(",");
      
      let e = this.getElement(tag);
      for (let i = 0; i < attributs.length; i++){
        let a = attributs[i].split("=");
        if (a[0][0] == "&"){
          e[a[0].slice(1,a[0].length)] = a[1];
        } else if (a[0][0] === "*"){
          e.addEventListener(a[0].slice(1,a[0].length),this.func[a[1]]);
        }else if (a[0][0] == "/"){
          let x = a[0].slice(1,a[0].length).split(":");
          x.push(e);
          this.func[a[1]](x);
        }else if(a[0] == "style"){
          this.style(e, style);
        }else{
          e.setAttribute(a[0],a[1]);
        }
      }
      if (tag == "div"){
        this.lastroot = e;
      }
      this.root[this.root.length-1].appendChild(e);
    }
    
    countLetter(str, letter) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] == letter) {
        count++;
      }
    }
    return count;
    }
    
    addFunctions(func){
      this.func = func;
    }
    
    compile(code2){
      let code = "";
      for (let i = 0; i < code2.length; i++){
        if (code2[i] != " "){
          code += code2[i];
        }
      }
      let lines1 = code.split(";");
      let lines2 = [];
      let lines2len = 0;
      for (let i = 0; i < lines1.length; i++){
        let line = lines1[i];
        let c = this.countLetter(line, "{");
        let c2 = this.countLetter(line, "}");
        let line2 = line;
        line = "";
        for (let i = 0; i < line2.length; i++){
          if(line2[i] != "{" && line2[i] != "}"){
            line += line2[i];
          }
        }
        for (let i = 0; i < c; i++){
          lines2.push("{");
          lines2len += 1;
        }
        lines2.push(line);
        lines2len += 1;
        for (let i = 0; i < c2; i++){
          lines2.push("}");
          lines2len += 1;
        }
      }
      for (let i = 0; i < lines2len; i++){
        this.handelElement(lines2[i]);
      }
      this.func = [];
    }
  }
  
  
  const str = 
  "div->&innerHTML=test,style(border-style = solid, border-color = red);{div->&innerHTML=test,style(border-style = solid,display=block);{br->class=test;button->&innerHTML=hallo}}";
  
  //problem etwas auf eine neue seite setzen momentan gelöst einfach nur ein div hinzufügen
  