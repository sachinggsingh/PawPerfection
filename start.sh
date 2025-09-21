
cd Backend
echo "Starting Backend..."
npm start &   
BACKEND_PID=$!


cd ../Frontend/client
echo "Starting Frontend..."
npm run dev &   
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
