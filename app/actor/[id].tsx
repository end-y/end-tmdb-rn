import { useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { Image, StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Text, View } from "../../components/Themed"
import { get_actor_by_id } from "../api"

const Actor = () => {
    let {id} = useLocalSearchParams()
    let [actor,setActor]:any = useState("")
    useEffect(() => {
        async function get(){
            let res = await get_actor_by_id((id as string))
            setActor(res)
        }
        get()
    },[])
    return(
        <ScrollView>
         <View style={styles.main} >
            <Image width={150} height={250} source={{uri:actor.profile_path ? "http://image.tmdb.org/t/p/w500"+actor.profile_path : "https://placehold.co/600x400.png?text=?"}} />
            <View>
                <Text style={styles.head}>{actor.name}</Text>
                <Text style={{fontWeight:"500"}}>{new Date(actor.birthday).toLocaleDateString()}</Text>
                <Text style={{fontWeight:"500"}}>{actor.place_of_birth}</Text>
            </View>
        </View>
        <View style={{padding:20, paddingTop:0}} >
            <Text style={styles.head}>About actor</Text>
            <Text style={{flex:1, marginTop:15}}>{actor.biography && actor.biography.length > 0 ?  actor.biography :"No information"}</Text>
        </View>
        </ScrollView>
       
    )
}

export default Actor

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
})