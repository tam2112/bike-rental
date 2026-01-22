import AreaMap from './home/AreaMap';
import Endow from './home/Endow';
import Hero from './home/Hero';
import OutstandingBike from './home/OutstandingBike';
import Stats from './home/Stats';

export default function Home() {
    return (
        <div>
            <Hero />
            <div className="flex-1 container flex flex-col items-center py-12 px-4 md:px-10 lg:px-20 gap-16 w-full max-w-360 mx-auto">
                <Stats />
                <OutstandingBike />
                <AreaMap />
                <Endow />
            </div>
        </div>
    );
}
