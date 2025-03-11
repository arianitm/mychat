import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

const Page = () => {

    const groups = useQuery(api.groups.get) || []
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {groups.map((group) => (
          <View key={group._id}>
            <Text>{group.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default Page