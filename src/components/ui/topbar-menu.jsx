import Link from "next/link";
import { Button } from "./button";

export function TopbarMenu(){
    return (
        <header className="p-8 flex items-center gap-9  m-auto ">
            <h1 className="text-5xl font-extrabold ">
                
                <Link href="/">Medkit</Link></h1>
    
            <nav className="flex justify-between items-center w-full">
                <div className="flex gap-6 text-sm">
                    <Link href="/">Planos</Link>
                    <Link href="/">Recursos</Link>
                </div>
                <div className="flex gap-7.5 ">
                    <Link href="/login">
                        <Button variant="outline">login</Button>
                    </Link>

                    <Link href="/cadastro">
                        <Button variant="outline">cadastre-se</Button>
                    </Link>
                </div>
            </nav>
        </header>
    )
}