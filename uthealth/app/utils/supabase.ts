import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Replace these with your actual Supabase values
const supabaseUrl = 'https://gsohwqqwqdpitvrkhllr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdzb2h3cXF3cWRwaXR2cmtobGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5MTk2MTksImV4cCI6MjA0MzQ5NTYxOX0.C_b3_mhustra9gzCMGsTISTf-J8wEklQMDArpwESRVM'

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
})

export default supabase
