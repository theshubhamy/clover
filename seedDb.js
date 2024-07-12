import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const usersData = [
  {
    name: 'Aarohi Sharma',
    email: 'aarohi.sharma@example.com',
    phone: '9876543210',
    password: 'Aarohi@123',
  },
  {
    name: 'Ananya Gupta',
    email: 'ananya.gupta@example.com',
    phone: ' 9876543211',
    password: 'Ananya@123',
  },
  {
    name: 'Ishika Patel',
    email: 'ishika.patel@example.com',
    phone: ' 9876543212',
    password: 'Ishika@123',
  },
  {
    name: 'Kiara Mehta',
    email: 'kiara.mehta@example.com',
    phone: ' 9876543213',
    password: 'Kiara@123',
  },
  {
    name: 'Naina Singh',
    email: 'naina.singh@example.com',
    phone: ' 9876543214',
    password: 'Naina@123',
  },
  {
    name: 'Riya Jain',
    email: 'riya.jain@example.com',
    phone: ' 9876543215',
    password: 'Riya@123',
  },
  {
    name: 'Sanya Agarwal',
    email: 'sanya.agarwal@example.com',
    phone: ' 9876543216',
    password: 'Sanya@123',
  },
  {
    name: 'Tara Kapoor',
    email: 'tara.kapoor@example.com',
    phone: ' 9876543217',
    password: 'Tara@123',
  },
  {
    name: 'Vanya Choudhary',
    email: 'vanya.choudhary@example.com',
    phone: '9876543218',
    password: 'Vanya@123',
  },
  {
    name: 'Zara Khan',
    email: 'zara.khan@example.com',
    phone: '9876543219',
    password: 'Zara@123',
  },
];

const register = async (name, email, phone, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const currentUser = userCredential.user;
    await currentUser.updateProfile({displayName: name});
    let res = await firestore().collection('users').doc(currentUser.uid).set({
      name,
      email,
      phone,
      photoURL: currentUser?.photoURL,
      uid: currentUser.uid,
      lastSignIn: firestore.FieldValue.serverTimestamp(),
    });
    console.log(res);
  } catch (error) {
    console.log(error.message);
  }
};

const seedUsersData = async users => {
  for (const user of users) {
    await register(user);
  }
};

// Call the seeding function
seedUsersData(usersData);
