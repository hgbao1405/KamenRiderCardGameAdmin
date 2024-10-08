import { useEffect, useState } from "react"
import CharacterService, { Character } from "../../../../service/character.service"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/ui"
import { Button, CharacterProgressBar } from "../../../../components/ui/ui";
import MessageService from "../../../../service/message.service";

export default function CharacterList() {
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
    const [characters, setCharacters] = useState<Character[]>([]);
    
    useEffect(() => {
      const getCharacters = async () => {
        try {
          const result = await CharacterService.GetAllCharacters();
          setCharacters(result);    
        } catch (err) {
          MessageService.error('Failed to fetch characters');
        }
      };
      getCharacters();
    }, []);

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Game Characters</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {characters.map((character) => (
            <Card key={character.id} className="flex flex-col justify-between">
              <CardHeader className="px-6 py-4 border-b border-gray-200 flex flex-row">
                <div className="flex justify-center mb-4">
                    <img src={'https://localhost:7223/'+character.avatar} alt={character.name} className="rounded-full w-24 h-24 object-cover" />
                </div>
                <div className="flex flex-col">
                    <CardTitle>{character.name}</CardTitle>
                    <CardDescription className="w-full pl-10 text-sm">{character.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Speed:</span>
                    <CharacterProgressBar value={character.speed} maxValue={100} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Attack:</span>
                    <CharacterProgressBar value={character.attack} maxValue={100} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Kick:</span>
                    <CharacterProgressBar value={character.kick} maxValue={100} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Health:</span>
                    <CharacterProgressBar value={character.health} maxValue={1000} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setSelectedCharacter(character)} >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        {selectedCharacter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md max-h-full overflow-auto">
              <CardHeader className="flex flex-row">
                <div className="flex mb-4">
                  <img src={'https://localhost:7223/'+selectedCharacter.avatar} alt={selectedCharacter.name} className="rounded-full w-32 h-32 object-cover" />
                </div>
                <div className="flex flex-col">
                    <CardTitle>{selectedCharacter.name}</CardTitle>
                    <CardDescription className="w-full pl-10 text-sm">{selectedCharacter.description}</CardDescription>
                </div>
              </CardHeader>

              <CardContent>  
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Speed</h3>
                    <CharacterProgressBar value={selectedCharacter.speed} maxValue={100}  />
                    <span className="text-sm text-muted-foreground">{selectedCharacter.speed}%</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Attack</h3>
                    <CharacterProgressBar value={selectedCharacter.attack} maxValue={100}  />
                    <span className="text-sm text-muted-foreground">{selectedCharacter.attack}%</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Kick</h3>
                    <CharacterProgressBar value={selectedCharacter.kick} maxValue={100}  />
                    <span className="text-sm text-muted-foreground">{selectedCharacter.kick}%</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Health</h3>
                    <CharacterProgressBar value={selectedCharacter.health} maxValue={1000}  />
                    <span className="text-sm text-muted-foreground">{selectedCharacter.health}%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setSelectedCharacter(null)}>
                  Close
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    )
  }