import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Image, Dimensions, Pressable, TouchableOpacity, TextInput } from 'react-native';
import { ScrollView,  } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from '../components/Themed';
import { get_all_fav_movies, get_all_searchs } from './api';

const Movies = () => {
  const [movies, setMovies] = useState([])
  let [pageNumber, setPageNumber] = useState(1)
  const [text, onChangeText] = useState('');
  const [search, openSearch] = useState(true)
  const [person, setPerson] = useState([])
  const [tv, setTv] = useState([])
  const [movies2, setMovies2] = useState([])
  useEffect(() => {
    async function get(){
      let {results} = await get_all_fav_movies(pageNumber)
      setMovies(results)
    }
    get()
  },[pageNumber])
  useEffect(() => {
    async function get(){
      let {results} = await get_all_searchs(text)
      setPerson(results.filter((e:any) => e.media_type == "person"))
      setTv(results.filter((e:any) => e.media_type == "tv"))
      setMovies2(results.filter((e:any) => e.media_type == "movie"))
      // setMovies(results)
    }
    get()
    if(text.length == 0){
      openSearch(true)
    }else{
      openSearch(false)
    }
  },[text])
  return (
    <SafeAreaView style={styles.container}>
      <TextInput  
        style={styles.input}
        onChangeText={onChangeText}
        value={text} />
        {
          search ? 
          <ScrollView keyboardShouldPersistTaps={true}>
          {movies.map((e:any) => {
            return(
              <View key={e.id} style={styles.card}>
                <Link href={`/movie/${e.id}`} asChild >
                  <Pressable>
                    <Image style={{marginBottom:10}} width={Dimensions.get("window").width-50} height={150} source={{uri:e.backdrop_path ? "http://image.tmdb.org/t/p/w500"+e.backdrop_path : "https://placehold.co/500x280?text=?"}} />
                    <Text style={{marginBottom:10, fontWeight:"500", width:Dimensions.get("window").width-50, flex:1, fontSize:20}} >{e.original_title}...</Text>
                    <Text>{e.overview.substring(0,150)}...</Text>
                  </Pressable>
                </Link>
              </View>
            )
          })}
          </ScrollView>
          :
          person && person.length > 0 && 
            <ScrollView  style={{flex:1}} >
              <View style={{width:"100%", borderBottomWidth:1,marginBottom:15,}}>  
                <Text style={{fontSize:20, marginLeft:15, marginBottom:5}}>Actors</Text>
              </View>
              <ScrollView nestedScrollEnabled={true} showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps={true} contentContainerStyle={styles.scrollContainer} horizontal>
                {person && person.length > 0 && person.map((e:any) => {
                  return(
                    <View style={styles.scrollView}>
                      <Link href={`/actor/${e.id}`}>
                        <View  >
                            <Image width={100} height={100} source={{uri:e.profile_path ? "http://image.tmdb.org/t/p/w500"+e.profile_path : "https://placehold.co/600x400.png?text=?"}} />
                            <Text>{e.name}</Text>
                        </View>
                      </Link>
                    </View>
                    
                    
                  )
                })}
              </ScrollView>
              <View style={{width:"100%", borderBottomWidth:1,marginBottom:15,}}>
              {
                movies2 && movies2.length > 0 && 
                <Text style={{fontSize:20, marginLeft:15, marginBottom:5}}>Movies</Text>
              }
              </View>
              <ScrollView nestedScrollEnabled={true} showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps={true} contentContainerStyle={styles.scrollContainer} horizontal>
                {movies2 && movies2.length > 0 && movies2.map((e:any) => {
                  return(
                    <View style={styles.scrollView}>
                       <Link  href={`/movie/${e.id}`}>
                        <View>
                            <Image width={100} height={100} source={{uri:e.backdrop_path ? "http://image.tmdb.org/t/p/w500"+e.backdrop_path : "https://placehold.co/600x400.png?text=?"}} />
                            <Text>{e.original_title}</Text>
                        </View>
                      </Link>
                    </View>
                   
                  )
                })}
              </ScrollView>
              <View style={{width:"100%", borderBottomWidth:1,marginBottom:15,}}>
              {
                tv && tv.length > 0 && 
                <Text style={{fontSize:20, marginLeft:15, marginBottom:5}}>Tv Shows</Text>
              }
              </View>
              <ScrollView nestedScrollEnabled={true} showsHorizontalScrollIndicator={false} style={{width:"100%", backgroundColor:"white"}}  contentContainerStyle={styles.scrollContainer} horizontal>
                {tv && tv.length > 0 && tv.map((e:any) => {
                  return(
                    <View style={styles.scrollView}>
                      <Link href={`/tv-show/${e.id}`}>
                        <View>
                          <Image width={100} height={100} source={{uri:e.backdrop_path ? "http://image.tmdb.org/t/p/w500"+e.backdrop_path : "https://placehold.co/600x400.png?text=?"}} />
                          <Text>{e.name}</Text>
                        </View>
                      </Link>
                    </View>

                  )
                })}
              </ScrollView>
          </ScrollView>
        }
     {
      search &&
      <View style={{display:"flex", alignItems:"stretch", paddingVertical:20, justifyContent:"space-between", flexDirection:"row"}}>
        <Pressable onPress={() => setPageNumber(pageNumber == 1 ? 1 : --pageNumber)} style={{flex:1}}>
          <Text style={{textAlign:"center"}}>Previous</Text>
        </Pressable>
        <View style={{borderLeftWidth:1, width:1}} />
        <Pressable onPress={() => setPageNumber(++pageNumber)} style={{flex:1}}>
          <Text style={{textAlign:"center"}}>Next</Text>
        </Pressable>
      </View>
     }
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card:{
    marginTop:10, paddingVertical:15, paddingHorizontal:10, marginHorizontal:15, borderRadius:15
  },
  container: {
    backgroundColor:"white",
    flex: 1,
    alignItems: "center",
    justifyContent: 'flex-start',
  },
  scrollContainer:{height:150, backgroundColor:"white", paddingHorizontal:10},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView:{marginRight:15, width:100},
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    marginTop:20,
    width: "95%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:8,
  },
});
export default Movies