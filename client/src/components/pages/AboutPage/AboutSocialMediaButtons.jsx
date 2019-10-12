import React from 'react'
import './AboutPage.css'

export default function AboutSocialMediaButtons() {
  return (
    <div>
      <button className="app-button about-social-media-button" onClick={openInstagram}>
          <div>
              <img src="https://cdn4.iconfinder.com/data/icons/picons-social/57/38-instagram-2-512.png" alt="Instagram"/>
              <h2>@klevcsoo</h2>
          </div>
      </button>
      <button className="app-button about-social-media-button" onClick={openSnapchat}>
          <div>
              <img src="https://cdn0.iconfinder.com/data/icons/social-flat-rounded-rects/512/snapchat-512.png" alt="Snapchat"/>
              <h2>@klevcsoo</h2>
          </div>
      </button>
      <button className="app-button about-social-media-button" onClick={openPsn}>
          <div>
              <img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands-1/512/262_Playstation_logo-512.png" alt="Playstation Network"/>
              <h2>@Klevcsoo</h2>
          </div>
      </button>
      <button className="app-button about-social-media-button">
          <div>
              <img src="https://cdn3.iconfinder.com/data/icons/streamline-icon-set-free-pack/48/Streamline-58-512.png" alt="Email"/>
              <h2>kevelajsz@outlook.com</h2>
          </div>
      </button>
    </div>
  )
}

const openInstagram = () => {
  window.location.href = 'https://www.instagram.com/klevcsoo';
}
const openSnapchat = () => {
  window.location.href = 'https://www.snapchat.com/add/klevcsoo';
}
const openPsn = () => {
  window.location.href = 'https://my.playstation.com/profile/Klevcsoo';
}
