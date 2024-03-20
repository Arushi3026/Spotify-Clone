const music = new Audio('assets/images/audio/arijit/2.mp3');
// music.play();

const songs = [
    
    {
        id:1,
        songName: ` Heeriye`,
        poster: "assets/images/arijit/1.jpg"
    },
    
    {
        id:2,
        songName: ` Agar tum Sath Ho`,
        poster: "assets/images/arijit/2.jpg"
    },
    
    {
        id:3,
        songName: ` Satranga`,
        poster: "assets/images/arijit/3.jpeg"
    },
    
    {
        id:4,
        songName: `  Tum Kya Mile`,
        poster: "assets/images/arijit/4.jpg"
    }
    
    
]

//for directly palcing posters and details from javascript array (dont need to makes changes in html file)
// Array.from(document.getElementsByClassName("songitem")).forEach((e, i) => {
//     e.getElementsByTagName('img')[0].src = songs[i];
//     e.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;

// });

let masterPlay = document.getElementById("masterPlay");
let wave = document.getElementById("wave");

masterPlay.addEventListener("click", ()=>{
    if (music.paused || music.currentTime <= 0) {
        music.play();
        wave.classList.add('active1');
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
       

    } else {
        music.pause();
        wave.classList.remove('active1');
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
    }
});

const makeAllplay = () =>{
    Array.from(document.getElementsByClassName('playlistplay')).forEach((el) =>{
        el.classList.add('bi-play-circle-fill');
        el.classList.remove('bi-pause-circle-fill');
    
    });
}


const makeAllback = () =>{
    Array.from(document.getElementsByClassName('songitem')).forEach((el) =>{
        el.style.background = 'rgb(58, 58, 58, .0)';
    })
}

let index=0;
let poster_masterplay = document.getElementById('poster_masterplay');
let download_music = document.getElementById('download_music');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playlistplay')).forEach((e)=>{
    e.addEventListener('click', (el) =>{
    index= el.target.id;
    music.src= `assets/images/audio/arijit/${index}.mp3`;
    poster_masterplay.src= `assets/images/arijit/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

    download_music.href =`assets/images/audio/arijit/${index}.mp3`;


        let songTitles = songs.filter((els)=> {
            return els.id == index;
        });

        songTitles.forEach((elss) =>{
            let {songName} = elss;
            title.innerHTML = songName;
            download_music.setAttribute('download', songName);
        });

        makeAllback();
        Array.from(document.getElementsByClassName('songitem'))[index-1].style.background = 'rgb(58, 58, 58, 0.473)';
        makeAllplay();
        el.target.classList.remove('bi-play-circle-fill');
        el.target.classList.add('bi-pause-circle-fill');
        wave.classList.add('active1');

    });
});

//seekbar music

let currentstart = document.getElementById('currentstart');
let currentend = document.getElementById('currentend');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];


music.addEventListener('timeupdate', ()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;
    // console.log(music_dur);

    let min1 = Math.floor(music_dur / 60);
    let sec1 = Math.floor(music_dur % 60);

    if (sec1 < 10) {
        sec1 = `0${sec1}`
    } 
    currentend.innerText = `${min1}:${sec1}`; 

    let min2 = Math.floor(music_curr / 60);
    let sec2 = Math.floor(music_curr % 60);

    if (sec2 < 10) {
        sec2 = `0${sec2}`
    } 
    currentstart.innerText = `${min2}:${sec2}`; 


    //seekbar
    let progressbar = parseInt((music_curr / music_dur) * 100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;

});

seek.addEventListener('change', ()=>{
    music.currentTime = seek.value * music.duration /100;
});


//volume

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_bar = document.getElementsByClassName('vol_bar');
let vol_dot = document.getElementById('vol_dot');

vol.addEventListener('change', ()=>{
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-off-fill');
    }
    if (vol.value > 0) {
        vol_icon.classList.remove('bi-volume-up-fill');
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.add('bi-volume-up-fill');
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-off-fill');
    }
    let vol_a = vol.value;
    vol_bar[index].style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a / 100; 
});


//next and previous
let back = document.getElementById("back");
let next = document.getElementById("next");

back.addEventListener('click', (el)=>{
    index -= 1;
    if (index < 1) {
        index = songs.length;
        
    }
    music.src= `assets/images/audio/arijit/${index}.mp3`;
    poster_masterplay.src= `assets/images/arijit/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

        let songTitles = songs.filter((els)=> {
            return els.id == index;
        });

        songTitles.forEach((elss) =>{
            let {songName} = elss;
            title.innerHTML = songName;
        });
        
        makeAllback();
        Array.from(document.getElementsByClassName('songitem'))[index-1].style.background = 'rgb(58, 58, 58, 0.473)';
        makeAllplay();
        el.target.classList.remove('bi-play-circle-fill');
        el.target.classList.add('bi-pause-circle-fill');
        wave.classList.add('active1');
});

next.addEventListener('click', (el)=>{
    index ++;
    // console.log(songs.length);
    if (index > songs.length) {
        index = 1;
        
    }
    // console.log(index);
    music.src= `assets/images/audio/arijit/${index}.mp3`;
    poster_masterplay.src= `assets/images/arijit/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

        let songTitles = songs.filter((els)=> {
            return els.id == index;
        });

        songTitles.forEach((elss) =>{
            let {songName} = elss;
            title.innerHTML = songName;
        });
        
        makeAllback();
        Array.from(document.getElementsByClassName('songitem'))[index-1].style.background = 'rgb(58, 58, 58, 0.473)';
        makeAllplay();
        el.target.classList.remove('bi-play-circle-fill');
        el.target.classList.add('bi-pause-circle-fill');
        wave.classList.add('active1');
});



let popleft = document.getElementById("popleft");
let popright = document.getElementById("popright");
let pop_song = document.getElementsByClassName("popsongs")[0];


popright.addEventListener('click', () => {
    pop_song.scrollLeft += 330;
});
popleft.addEventListener('click', () => {
    pop_song.scrollLeft -= 330;
});

let arrow_left = document.getElementById("arrow_left");
let arrow_right = document.getElementById("arrow_right");
let items = document.getElementsByClassName("items")[0];

arrow_right.addEventListener('click', () => {
    items.scrollLeft += 330;
});
arrow_left.addEventListener('click', () => {
    items.scrollLeft -= 330;
});


let shuffle = document.getElementsByClassName('shuffle')[0];
shuffle.addEventListener('click', ()=>{
    let a = shuffle.innerHTML;

    switch (a) {
        case "next":
            shuffle.classList.add('bi-repeat');
            shuffle.classList.remove('bi-music-note-beamed');
            shuffle.classList.remove('bi-shuffle');
            shuffle.innerHTML = 'repeat';
            break;
        case "repeat":
            shuffle.classList.remove('bi-repeat');
            shuffle.classList.remove('bi-music-note-beamed');
            shuffle.classList.add('bi-shuffle');
            shuffle.innerHTML = 'random';
            break;
        case "random":
            shuffle.classList.remove('bi-repeat');
            shuffle.classList.add('bi-music-note-beamed');
            shuffle.classList.remove('bi-shuffle');
            shuffle.innerHTML = 'next';
            break;
        
    }
});



const next_music = (el)=>{
    // index ++;
    if (index==songs.length) {
        index=1;
        
    } else {
        index++;
    }
    music.src= `assets/images/audio/arijit/${index}.mp3`;
    poster_masterplay.src= `assets/images/arijit/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

    download_music.href =`assets/images/audio/arijit/${index}.mp3`;


        let songTitles = songs.filter((els)=> {
            return els.id == index;
        });

        songTitles.forEach((elss) =>{
            let {songName} = elss;
            title.innerHTML = songName;
            download_music.setAttribute('download', songName);
        });

        makeAllback();
        Array.from(document.getElementsByClassName('songitem'))[index-1].style.background = 'rgb(58, 58, 58, 0.473)';
        makeAllplay();
        el.target.classList.remove('bi-play-circle-fill');
        el.target.classList.add('bi-pause-circle-fill');
        wave.classList.add('active1');
}

const repeat_music = (el)=>{
    index;
    music.src= `assets/images/audio/arijit/${index}.mp3`;
    poster_masterplay.src= `assets/images/arijit/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

    download_music.href =`assets/images/audio/arijit/${index}.mp3`;


        let songTitles = songs.filter((els)=> {
            return els.id == index;
        });

        songTitles.forEach((elss) =>{
            let {songName} = elss;
            title.innerHTML = songName;
            download_music.setAttribute('download', songName);
        });

        makeAllback();
        Array.from(document.getElementsByClassName('songitem'))[index-1].style.background = 'rgb(58, 58, 58, 0.473)';
        makeAllplay();
        el.target.classList.remove('bi-play-circle-fill');
        el.target.classList.add('bi-pause-circle-fill');
        wave.classList.add('active1');
}

const random_music = (el)=>{
   
    if (index==songs.length) {
        index=1;
        
    } else {
        index = Math.floor((Math.random() * songs.length)+1);
    }
    music.src= `assets/images/audio/arijit/${index}.mp3`;
    poster_masterplay.src= `assets/images/arijit/${index}.jpg`;
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');

    download_music.href =`assets/images/audio/arijit/${index}.mp3`;


        let songTitles = songs.filter((els)=> {
            return els.id == index;
        });

        songTitles.forEach((elss) =>{
            let {songName} = elss;
            title.innerHTML = songName;
            download_music.setAttribute('download', songName);
        });

        makeAllback();
        Array.from(document.getElementsByClassName('songitem'))[index-1].style.background = 'rgb(58, 58, 58, 0.473)';
        makeAllplay();
        el.target.classList.remove('bi-play-circle-fill');
        el.target.classList.add('bi-pause-circle-fill');
        wave.classList.add('active1');
}

music.addEventListener('ended', ()=>{
    let b = shuffle.innerHTML;
    switch (b) {
        case 'repeat':
            repeat_music();
            break;
    
        case 'next':
            next_music();
            break;

        case 'random':
            random_music();
            break;
    
    }
});