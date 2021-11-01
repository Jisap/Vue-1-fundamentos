<template>
    <div>
        <h2>{{ customTitle }}</h2>
        <p>{{ counter }} <sup>2</sup> = {{ squareCounter }}</p>
        <p data-testid="counter">{{ counter }}</p>
        <div>                                       
            <button @click="increase">+1</button>   <!--V-on se puede sustituir por @ para indicar lo mismo: escuchar un evento-->    
            <button @click="decrease">-1</button>
        </div>
    </div>
</template>

<script>
export default {

    props: {
        title:String,
        start:{
            type:Number,
            default:100,
            validator( value ){
                return value >= 0
            }
            //required:true,
        },
    },

    name: 'counter',
    data(){
        return {
            counter: this.start
        }
    },
    methods: {
        getSquareValue(){
            return this.counter * this.counter
        },
        increase(){
            this.counter++
        },
        decrease(){
            this.counter--
        }
    },
    computed:{  // Se guardan en la cache y solo se recalcula cuando el counter cambia.
        squareCounter(){
            return this.counter * this.counter
        },
        customTitle(){
            // if( this.title !== undefined){               1º opción
            //     return this.title
            // }else{
            //     return 'Counter'
            // }
            //return this.title ? this.title : 'Counter'    2ª opción
            return this.title || 'Counter'                //3ª opción  
        }
    }
}
</script>

<style>
    button{
        background-color: #64BB87;
        border-radius: 5px;
        color: white;
        margin: 0 5px;
        border: 1px solid white;
        cursor: pointer;
        padding: 5px 15px;
        transition: 0.3s ease-in-out
    }
    button:hover{
        background-color: #5aa67b;
        transition: 0.3s ease-in-out;
    }
</style>