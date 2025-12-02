const { createClient } = require('@supabase/supabase-js');

try {
  console.log("Testing createClient with undefined...");
  const client = createClient(undefined, undefined);
  console.log("Client created successfully (unexpected)");
} catch (error) {
  console.log("Caught expected error:", error.message);
}
