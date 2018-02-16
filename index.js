import $ from 'jquery';

const DELAY = 100;
export default function LoadSerially(selector) {
  let promises = [];
  const $thumbList = $(selector);

  if(!$thumbList.length)return;

  $thumbList.each((index, item)=>{
    let $item = $(item);
    let src = $(item).data('normal');
    promises.push(loadImage($item, src));
  });

  //load serially
  promises.reduce((prev, current, index)=>{
    return prev.then(current);
  }, Promise.resolve());
}

const loadImage = ($item, src)=>{
  return ()=>{
    return new Promise((resolve, reject)=>{
      //create image object
      let image = document.createElement('img');
      image.src = src;

      // resolve
      image.onload = e=>{
        setTimeout(()=>{
          applyImage($item, src);
          resolve();
        }, DELAY);
      };
    });
  }
}

//do something
const applyImage = ($item, src)=>{
  $item.css({opacity:1});
  $item.find('img').attr({src: src});
}
