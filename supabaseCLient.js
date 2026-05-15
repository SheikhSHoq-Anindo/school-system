import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ooctalcgppkrzcjvdmih.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vY3RhbGNncHBrcnpjanZkbWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3OTI5ODMsImV4cCI6MjA5NDM2ODk4M30.gO86ufpeP-QbTmonMo6bSOpHnmWwV1TzYDxG6jreI9Q'

export const supabase = createClient(supabaseUrl, supabaseKey)