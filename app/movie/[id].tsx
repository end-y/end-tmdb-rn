import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { Image, StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Text, View } from "../../components/Themed"
import { get_movie_by_id } from "../api"

const Movie = () => {
    let {id} = useLocalSearchParams()
    let [movie,setMovie]:any = useState("")
    useEffect(() => {
        async function get(){
            let res = await get_movie_by_id((id as string))
            setMovie(res)
        }
        get()
    },[])
    return(
        <ScrollView>
            <Image width={"100%"} height={250} style={{objectFit:"contain"}} source={{uri:movie.backdrop_path ? "http://image.tmdb.org/t/p/w500"+movie.backdrop_path : "https://placehold.co/600x400.png?text=?"}} />
         <View style={styles.main} >
            
            <View style={styles.infMain}>
                <View style={{maxWidth:"75%"}}>
                    <Text style={styles.head}>{movie.original_title}</Text>
                    <Text style={{fontWeight:"500"}}>{new Date(movie.release_date).toLocaleDateString()}</Text>
                </View>
                <Text style={styles.point}>{movie.vote_average?.toFixed(1)}</Text>
            </View>
        </View>
        <View style={{padding:20, paddingTop:0}} >
            <Text style={styles.head}>About movie</Text>
            <Text style={{flex:1, marginTop:15}}>{movie.overview && movie.overview.length > 0 ?  movie.overview :"No information"}</Text>
        </View>
        </ScrollView>
    )
}

export default Movie

const styles = StyleSheet.create({
    main:{
        padding:20,
        flexDirection:"row",
        gap:10
    },
    head:{
        fontSize:20,
        fontWeight:"600"
    },
    point:{fontWeight:"500", backgroundColor:"yellow", textAlign:"center", padding:15, marginTop:10, borderRadius:10},
    infMain:{flexDirection:"row", justifyContent:"space-between", width:"100%", alignItems:"center"}
})