import Indecision from '@/components/Indecision';
import { shallowMount } from '@vue/test-utils/';


describe('Indecision Component', () => {

    let wrapper;
    let clgSpy;

    global.fetch = jest.fn(() => Promise.resolve({  // Mock de la función fetch
        json: () => Promise.resolve({
            answer:'yes',
            forced:false,
            image: 'https://yesno.wtf/assets/yes/2.gif'
        })
    }));        

    beforeEach(() => {
        wrapper = shallowMount( Indecision );               // Montamos el componente Indecision (instancia) para cada prueba.
        clgSpy = jest.spyOn(console, 'log');                // Espiaremos el objeto console y su método log.
        jest.clearAllMocks();                               // Se limpiaran de sus rdos todos los moks cada vez que inicie una prueba
    })

    test('debe de hacer match con el snapshot', () => {    
         expect( wrapper.html() ).toMatchSnapshot(); // Esperariamos que el html de esa instancia = a una fotografia del html del componente.
    })

    test('Escribir en el input no debe de disparar nada (console.log)', async() => {
        
        const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer'); // Espía sobre el método getAnswer
        
        const input = wrapper.find('input');                // Identificamos el input
        await input.setValue('Hola mundo');                 // Le damos un valor ficticio
        expect( clgSpy ).toHaveBeenCalled();                // Esperariamos que el espia del console.log halla sido llamado.         
        expect( getAnswerSpy ).not.toHaveBeenCalled();      // Esperariamos que el espia de getAnswer no halla sido llamado
    
    });
    
    test('escribir el simbolo de "?" debe de disparar el getAnswer', async() => {
        
        const getAnswerSpy = jest.spyOn( wrapper.vm, 'getAnswer');  // Espía sobre el método getAnswer
        
        const input = wrapper.find('input');                        // Identificamos el input
        await input.setValue('Hola mundo ?');                       // Le damos un valor ficticio con el caracter "?"
        expect( getAnswerSpy ).toHaveBeenCalled();                  // Esperariamos que el espia de getAnswer no halla sido llamado
    });

    test('pruebas en getAnswer', async() => {
        
        await wrapper.vm.getAnswer();                                           // Simulamos una llamada al método getAnswer -> petición fetch
        const img = wrapper.find('img');                                        // Identificamos donde esta la imagen
        expect( img.exists() ).toBeTruthy();                                    // Esperariamos que la imagen existiese
        expect( wrapper.vm.img ).toBe( 'https://yesno.wtf/assets/yes/2.gif' );  // que la imagen tuvieran esa dirección
        expect( wrapper.vm.answer ).toBe( 'Si!' );                              // que el valor de answer en el html= 'Si'
    });

    test('pruebas en getAnwser - Fallo en el API', async() => {
        
        fetch.mockImplementationOnce( () => Promise.reject('API is down')); // Simulamos una llamada a un API que da como Rdo un error

        await wrapper.vm.getAnswer();                                       // Simulamos una llamada al método getAnswer -> petición fetch
        const img = wrapper.find('img');                                    // identificamos donde iria la imagen
        expect( img.exists() ).toBeFalsy();                                 // Esperariamos que la img no existiese
        expect( wrapper.vm.answer ).toBe( 'No se pudo cargar del API' );    // Esperariamos que el valor de answer fuese "No se puedo cargar del API" 
    });

})