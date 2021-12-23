import React from 'react' 
import Particles from 'react-tsparticles'


const ReactParticles = () => {
    
    return (
        <div>
            <Particles
                id='tsparticles'
                options={{
                    fpsLimit: 60,
                    particles: {
                        color: {
                            value: '#ffffff',
                        },
                        links: {
                            color: '#ffffff',
                            distance: 150,
                            enable: true,
                            opacity: 0.2,
                            width: 1,
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            direction: 'none',
                            enable: true,
                            outMode: 'bounce',
                            random: false,
                            speed: 4,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                value_area: 800,
                            },
                            value: 30,
                        },
                        opacity: {
                            value: 0.2,
                        },

                        shape: {
                            type: '',
                        },
                        size: {
                            random: true,
                            value: 5,
                        },
                    },
                    detectRetina: true,
                }}
            />
        </div>
    )
}

export default ReactParticles