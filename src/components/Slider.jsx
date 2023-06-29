import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import Spinner from '../components/Spinner';
import { db } from '../firebase';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css/bundle';

export default function Slider() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, 'listings');
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));
      const querySnap = await getDocs(q);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }

    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (listings.length === 0) {
    return <></>;
  }
  return (
    listings && (
      <>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: 'progressbar' }}
          effect='fade'
          modules={{ EffectFade }}
          autoplay={{ delay: 3000 }}
          loop
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
              <div
                style={{
                  background: `url(${data.imgUrls[0]}) center, no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='relative w-full h-[300px] overflow-hidden'
              ></div>
              <p className='text-white absolute left-1 top-3 font-medium max-w-[90%] bg-[#85a6a7] shadow-lg opacity-90 p-2 rounded-br-3xl'>
                {data.name}
              </p>
              <p className='text-white absolute left-1 bottom-1 font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl'>
                $
                {data.discountedPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ??
                  data.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                {data.type === 'rent' && ' / month'}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}
