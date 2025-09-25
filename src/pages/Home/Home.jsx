import React from 'react';
import Banner from './Banner';
import WhyChoose from './WhyChoose';
import Testimonials from './Testimonials';
import AvailableStudySession from './AvailableStudySession';

const Home = () => {
    return (
        <div>
            <section className='mb-24'>
                <Banner></Banner>
            </section>
            <section className='mb-24'>
                <AvailableStudySession></AvailableStudySession>
            </section>
            <section className='mb-24'>
                <WhyChoose></WhyChoose>
            </section>
            <section className='mb-24'>
                <Testimonials></Testimonials>
            </section>
        </div>
    );
};

export default Home;