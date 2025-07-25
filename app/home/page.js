'use client'
import Home from "@/components/Home";

// export const metadata = {
//   title: "Jagjit Kaur | Handcrafted Indian Fashion - Heritage Collection",
//   description: "Discover exquisite handcrafted sarees, lehengas, and traditional Indian wear. Premium quality artisan-made garments celebrating timeless elegance.",
//   keywords: ["handcrafted sarees", "traditional Indian fashion", "heritage collection", "artisan wear", "Jagjit Kaur"],
// };


export default function HomePage() {
  // const [user, loading] = useAuthState(auth);
  //   const router = useRouter();
  //   if (loading) {
  //       return <div className="flex items-center justify-center h-screen">Loading...</div>;
  //   }
  //   if (!user) {
  //       <div className="flex items-center justify-center h-screen">You must be an admin to view this page.</div>;
  //       router.push("/");
  //   }
  return <Home/>
}