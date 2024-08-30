import { useEffect } from 'react'
import './App.css'

function App() {

  useEffect(() => {
    let banner = document.querySelector('.banner');
    let canvas = document.getElementById('dotsCanvas');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    const dots = [];
    const arrayColors = ['#eee', '#545454', '#596d91', '#bb5a68', '#696541'];
    for (let index = 0; index < 50; index++) {
      dots.push({
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * canvas.height),
        size: Math.random() * 3 + 5,
        color: arrayColors[Math.floor(Math.random() * 5)]
      });
    }
    const drawDots = () => {
      dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      })
    }
    drawDots();
    banner.addEventListener('mousemove', (event) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawDots();
      let mouse = {
        x: event.pageX - banner.getBoundingClientRect().left,
        y: event.pageY - banner.getBoundingClientRect().top
      }
      dots.forEach(dot => {
        let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        if (distance < 300) {
          ctx.strokeStyle = dot.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      })
    })
    banner.addEventListener('mouseout', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawDots();
    })
    window.addEventListener('resize', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = banner.offsetWidth;
      canvas.height = banner.offsetHeight;

      dots = [];
      for (let index = 0; index < 50; index++) {
        dots.push({
          x: Math.floor(Math.random() * canvas.width),
          y: Math.floor(Math.random() * canvas.height),
          size: Math.random() * 3 + 5,
          color: arrayColors[Math.floor(Math.random() * 5)]
        });
      }
      drawDots();
    })
  }, [])

  return (
    <>
      <header>
        <figure><img src="https://raw.githubusercontent.com/HoanghoDev/youtube_v2/9d185f4ff9f505618e2a873e05be09e05d5efcbc/logo.svg" alt="" /></figure>
        <nav>
          <ul>
            <li><a href='facebook.com'>Overview</a></li>
            <li>Team</li>
            <li>Pricing</li>
            <li>Enterprise</li>
          </ul>
        </nav>
      </header>
      <main>
        <div className='banner'>
          <h5>Khesehang Samsohang Limbu</h5>
          <div>
            <h1 className='left text-[4em]'>ANIMATION spider man</h1>
            <h1 className='right text-[4em] text-white'>using javascript</h1>
          </div>
          <h4></h4>
          <button>Subscribe now &#8599</button>

          <canvas id="dotsCanvas"></canvas>
        </div>
      </main>
      <div className='w-full h-[100vh] bg-red-900'></div>
    </>
  )
}

export default App
