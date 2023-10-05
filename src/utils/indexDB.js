
import { openDB } from 'idb';

const DB_NAME = 'employee_db';
const DB_VERSION = 1;
const STORE_NAME = 'employees';

export async function initializeDB() {
    const db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(database) {
        const store = database.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('name', 'name', { unique: false });
        store.createIndex('position', 'position', { unique: false });
        store.createIndex('startDate', 'startDate', { unique: false });
        store.createIndex('endDate', 'endDate', { unique: false });
      },
    });
    return db;
  }
  

let dbInstance;

export async function openDatabase() {
  if (!dbInstance) {
    dbInstance = await initializeDB();
  }
  return dbInstance;
}
export async function getEmployeeById(id) {
    console.log("id",id)
    const db = await openDatabase();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
  
    return new Promise((resolve, reject) => {
      const request = store.get(id);
  
      request.onsuccess = () => {
        resolve(request.result);
      };
  
      request.onerror = () => {
        reject(new Error('Error getting employee by ID'));
      };
    });
  }

export async function addEmployee(employee) {
  const db = await openDatabase();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  const employeeId = await store.add(employee);
  return employeeId;
}

export async function getAllEmployees() {
  const db = await openDatabase();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const employees = await store.getAll();
  return employees;
}

export async function deleteEmployee(employeeId) {
  const db = await openDatabase();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  await store.delete(employeeId);
}

export async function updateEmployee(updatedEmployee) {
    console.log("updaet employee",updatedEmployee)
  const db = await openDatabase();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  await store.put(updatedEmployee);
}

