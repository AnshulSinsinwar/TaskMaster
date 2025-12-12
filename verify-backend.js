const url = 'http://localhost:5000/api';

async function test() {
  try {
    console.log('--- Starting Verification ---');
    // Register
    const email = `test${Date.now()}@example.com`;
    console.log(`1. Registering user: ${email}`);
    const reg = await fetch(`${url}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test User', email, password: 'password123' })
    });
    
    if (reg.status !== 201) {
        const err = await reg.text();
        throw new Error(`Registration failed: ${reg.status} ${err}`);
    }
    console.log('   -> Registration Success');

    // Login
    console.log('2. Logging in');
    const login = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: 'password123' })
    });
    
    if (login.status !== 200) {
        throw new Error(`Login failed: ${login.status}`);
    }
    
    const data = await login.json();
    const token = data.token;
    console.log('   -> Login Success, Token received');

    // Create Task
    console.log('3. Creating Task');
    const taskRes = await fetch(`${url}/tasks`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: 'Verification Task', description: 'Created by script', status: 'pending' })
    });
    
    if (taskRes.status !== 200) {
        throw new Error(`Create Task failed: ${taskRes.status}`);
    }
    console.log('   -> Task Created');

    // Get Tasks
    console.log('4. Fetching Tasks');
    const tasksRes = await fetch(`${url}/tasks`, {
         headers: { 'Authorization': `Bearer ${token}` }
    });
    const taskList = await tasksRes.json();
    console.log(`   -> Tasks found: ${taskList.length}`);
    
    if (taskList.length === 0) throw new Error('No tasks found after creation');
    if (taskList[0].title !== 'Verification Task') throw new Error('Task title mismatch');

    console.log('--- Verification PASSED ---');

  } catch (e) {
    console.error('--- Verification FAILED ---');
    console.error(e);
    process.exit(1);
  }
}

test();
