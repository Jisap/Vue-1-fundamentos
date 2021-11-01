

describe( 'Example Component', () =>{

  test('Debe de ser mayor a 10', () => {
    
    //Arreglar
    let value = 10;

    //Estímulo
    value = value + 2;

    //Observar el resultado esperado
    expect( value ).toBeGreaterThan( 10 )
  });
  
})
