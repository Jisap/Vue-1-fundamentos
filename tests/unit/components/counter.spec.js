import Counter from '@/components/Counter';
import { shallowMount, mount } from '@vue/test-utils/'; // mount monta todos los componentesde una app, shallowMount solo monta un componente

describe('Counter Component', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Counter);               // // Montamos el componente Counter (instancia) para cada prueba
    })
    
    // test('debe de hacer match con el snapshot', () => {
    //     const wrapper = shallowMount( Counter );    // Montamos el componente Counter, es como una instancia del componente
    //     expect( wrapper.html() ).toMatchSnapshot(); // Esperariamos que el html de esa instancia = a una fotografia del html del componente.
    // })

    test('h2 debe de tener el valor por defecto', () => {
                
        const h2Value = wrapper.find('h2').text();      // Localizamos el h2 en la instancia y su valor string
        expect( h2Value ).toBe('Counter');              // Esperariamos que el h2 contuviera un valor string = 'Counter'
    });
    
    test('El valor por defecto de de ser 100 en el p', () => {
        
        const p2Value = wrapper.findAll('p').at(1);     // Localizamos el 2º p
        expect(p2Value.text()).toBe('100');             // Esperariamos que el valor string de ese p = 100
        
        const value = wrapper.find('[data-testid="counter"]').text(); // Lo mismo pero con un id
        expect( value ).toBe('100');
    });

    test('debe de incrementar y decrementar el valor del contador', async() => {
        
        const [ increaseBtn, decreaseBtn ] = wrapper.findAll( 'button' );  // Localizamos todos los botones.
        await increaseBtn.trigger('click');                                // Hacemos click en el 3 veces.        
        await increaseBtn.trigger('click'); 
        await increaseBtn.trigger('click');     
        await decreaseBtn.trigger('click');                                // Simulamos 2 clicks en el boton de disminuir
        await decreaseBtn.trigger('click');
        const value = wrapper.find('[data-testid="counter"]').text();      // Localizamos por id donde esta el valor del p que queremos evaluar

        expect( value ).toBe('101');

    });
    
    test('debe de establecer el valor por defecto', () => {
        
        const { start } =wrapper.props();                                   // De las props seleccionamos start                  
        const value = wrapper.find('[data-testid="counter"]').text();       // Localizamos por id el valor del p que queremos evaluar
        expect( Number(value)).toBe(start);                                 // Esperariamos que el valor numérico = prop start                              
    });
    
    test('debe de mostrar la prop title', () => {
        
        const title = 'Hola mundo'
        const wrapper = shallowMount( Counter, {                // Montamos un Counter con la prop title
            props:{
                title
            }
        });

        expect(wrapper.find('h2').text()).toBe(title);   // Esperariamos que donde se monta la prop (h2) = prop title montada
    });
    
});
