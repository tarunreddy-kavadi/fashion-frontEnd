import React from 'react'
import Announcment from '../components/Announcment';
import Navbar from "../components/Navbar"
import Slider from '../components/Slider';
import Categories from '../components/Categories'
import Products from '../components/Products'
import NewsLetter from '../components/NewsLetter';
import Footer from '../components/Footer';
const Home = () => {
  
  return (
    <div>
<Announcment/>
<Navbar/>
<Slider/>
<Categories/>
<Products/>
<NewsLetter/>
<Footer/>
</div>
  )
}

export default Home;
