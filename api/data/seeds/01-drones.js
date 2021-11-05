const drones =[
    {
     drone_id:1,
     drone_name:'Quad Copter',
     drone_description:'Mini drone with four engines for mobility and stability',
     drone_cost: 300,
     drone_image:'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80'
    },
    {
        drone_id:2,
        drone_name:'Gray Quad Drone',
        drone_description:'Mini drone with four engines for mobility and stability. Camera is attached under the main body.',
        drone_cost: 200,
        drone_image:'https://images.unsplash.com/photo-1542061986776-ccc39eb160ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80'
    },
    {
        drone_id:3,
        drone_name:'Mavic Pro',
        drone_description:'Mini drone with four engines. Camera is attached under the main body.Black body',
        drone_cost: 200,
        drone_image:'https://images.unsplash.com/photo-1520870121499-7dddb6ccbcde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80'
    },
    {
        drone_id:4,
        drone_name:'Mavic Pro +',
        drone_description:'Mini drone with four engines. Camera is attached under the main body.Body is stronger.',
        drone_cost: 500,
        drone_image:'https://images.unsplash.com/photo-1527441385177-3dad16222699?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80'
    },
    {
        drone_id:5,
        drone_name:'Mavic Pro ++',
        drone_description:'Drone with four engines, and Panasonic DMC-GX7 camera. Camera is attached under the main body.Body is stronger.',
        drone_cost: 800,
        drone_image:'https://images.unsplash.com/photo-1473186639016-1451879a06f0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1105&q=80'
    }


]


exports.seed=function(knex){
    return knex('drones').insert(drones)
}