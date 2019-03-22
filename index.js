 let matrix=[
    ['0','1','0','0','0'],
    ['0','0','1','0','0'],
    ['1','1','1','0','0'],
    ['0','0','0','0','0'],
    ['0','0','0','0','0'],
] 

let gliderMask=['🌎','🌍','🌏']
let empty='🌕'

function calcNeighbourCount(x,y){
    let h=matrix.length
    let w=matrix[0].length
    if(x<0 || x>(w-1)) return 0;
    if(y<0 || y>(h-1)) return 0;
    //console.log(matrix[y],matrix[y][x],x,y)
    if(matrix[y][x]==='1') 
        return 1;
    return 0;
    //matrix[y][x]

}
function calcNeiboursCount(x,y){
    return (
        calcNeighbourCount(x-1,y-1)+
        calcNeighbourCount(x+0,y-1)+
        calcNeighbourCount(x+1,y-1)+

        calcNeighbourCount(x+1,y)+
        calcNeighbourCount(x-1,y)+

        calcNeighbourCount(x-1,y+1)+
        calcNeighbourCount(x+0,y+1)+
        calcNeighbourCount(x+1,y+1)
    )
}
function copy(mat){
    return JSON.parse(JSON.stringify(mat))
}
function logic(){

    let matrix2=copy(matrix)
    for (let x = 0; x < matrix2[0].length; x++) {
        for (let y = 0; y < matrix2.length; y++) {
            let c=calcNeiboursCount(x,y)
            if(matrix[y][x]==='1'){
                if(c<2){
                    matrix2[y][x]='0'
                }else if(c===2 || c===3){
                    //nothing todo 
                }else if(c>3){
                    matrix2[y][x]='0'
                }
            }else if(matrix[y][x]==='0') {
                if(c===3){
                    matrix2[y][x]='1'
                }
            }
        }
    }

    return matrix2;
}
function showDecorate(d,gen){
    if(d==='1'){
        return gliderMask[gen%3]
    }else if(d==='0') {
        return empty
    }else {
        throw new Error('hmm , not match cell !!')
    }
}
function decorate(mat,gen){
    console.clear()
    for (let x = 0; x < mat[0].length; x++) {

        for (let y = 0; y < mat.length; y++) {
            process.stdout.write(
                ' '+
                showDecorate(mat[y][x],gen)
            )
        }

        console.log('\n')
    }
}

function run(){
    let gen=0;
    decorate(logic(),gen)
    matrix=logic()
    gen++;
}
setInterval(() => {
    run()
}, 1000);



//