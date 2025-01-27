import React, {useState} from 'react';
import {Stack, Text} from '@tamagui/core';
import {Button} from '@/components/Button';
import {InformationalScreen} from './InformationalScreen/InformationalScreen';
import {useNavigation} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';

export function InformationalScreenExample() {
    const navigation = useNavigation();

    const [index, setIndex] = useState(0);

    const onNext = () => {
        setIndex((prev) => Math.min(prev + 1, 3));
    };

    const onPrev = () => {
        setIndex((prev) => Math.max(prev - 1, 0));
    };

    const onClose = () => {
        setIndex(0);
        navigation.goBack();
    };

    return (
        <>
            <StatusBar />
            <InformationalScreen index={index}>
                <InformationalScreen.Page>
                    <InformationalScreen.Content>
                        <Text>
                            Voluptatum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero at autem blanditiis itaque sunt voluptatem aliquam dolorum dolorem tempora sit
                            placeat, minus ipsam amet, dolor consequatur vero aperiam inventore. Voluptatum!
                        </Text>
                        <Text>
                            Nibh nisl condimentum id venenatis a. Fames ac turpis egestas integer eget aliquet nibh praesent. Aliquam id diam maecenas ultricies. Cursus in hac habitasse
                            platea dictumst. Faucibus ornare suspendisse sed nisi lacus sed. Nisl nisi scelerisque eu ultrices. Pellentesque sit amet porttitor eget dolor morbi. Tincidunt
                            eget nullam non nisi. Aliquet enim tortor at auctor urna nunc id. Nibh nisl condimentum id venenatis a. Eu feugiat pretium nibh ipsum. Viverra accumsan in nisl
                            nisi. Praesent elementum facilisis leo vel fringilla. Lorem ipsum dolor sit amet consectetur adipiscing. Phasellus egestas tellus rutrum tellus pellentesque eu
                            tincidunt.
                        </Text>
                    </InformationalScreen.Content>
                    <InformationalScreen.Footer>
                        <Text>
                            Page {index + 1} of 4. Nullam eget tincidunt arcu. Nullam eget tincidunt arcu. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet
                            consectetur adipisicing elit.
                        </Text>
                        <Button
                            label="Next"
                            flexGrow={1}
                            onPress={onNext}
                        />
                    </InformationalScreen.Footer>
                </InformationalScreen.Page>
                <InformationalScreen.Page>
                    <InformationalScreen.Content>
                        <Text>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero at autem blanditiis itaque sunt voluptatem aliquam dolorum dolorem tempora sit placeat, minus
                            ipsam amet, dolor consequatur vero aperiam inventore. Voluptatum!
                        </Text>
                        <Text>
                            Dolor sit amet consectetur adipisicing elit. Libero at autem blanditiis itaque sunt voluptatem aliquam dolorum dolorem tempora sit placeat, minus ipsam amet,
                            dolor consequatur vero aperiam inventore. Voluptatum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero at autem blanditiis itaque sunt voluptatem
                            aliquam dolorum dolorem tempora sit placeat, minus ipsam amet, dolor consequatur vero aperiam inventore. Voluptatum!
                        </Text>
                        <Text>
                            A cras semper auctor neque vitae tempus. Proin libero nunc consequat interdum varius sit. Viverra ipsum nunc aliquet bibendum enim facilisis. Magna etiam tempor
                            orci eu lobortis. Ut venenatis tellus in metus vulputate eu. Dictum varius duis at consectetur lorem donec massa sapien. Sed cras ornare arcu dui vivamus.
                            Ullamcorper velit sed ullamcorper morbi tincidunt. Tristique magna sit amet purus. Nibh praesent tristique magna sit amet purus gravida quis blandit. Nunc
                            lobortis mattis aliquam faucibus purus in massa tempor nec. Vel pharetra vel turpis nunc eget lorem dolor. Laoreet id donec ultrices tincidunt. Integer eget
                            aliquet nibh praesent tristique. Vitae tortor condimentum lacinia quis vel eros donec ac odio. Ut eu sem integer vitae justo eget. Ac odio tempor orci dapibus
                            ultrices in. Pellentesque nec nam aliquam sem et tortor consequat id.
                        </Text>
                    </InformationalScreen.Content>
                    <InformationalScreen.Footer>
                        <Text>Page {index + 1} of 4. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget tincidunt arcu.</Text>
                        <Stack
                            flexDirection="row"
                            gap="$2"
                        >
                            <Button
                                label="Back"
                                flexGrow={1}
                                onPress={onPrev}
                                variant="secondary"
                            />
                            <Button
                                label="Next"
                                flexGrow={1}
                                onPress={onNext}
                            />
                        </Stack>
                    </InformationalScreen.Footer>
                </InformationalScreen.Page>
                <InformationalScreen.Page>
                    <InformationalScreen.Content>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
                        <Text>
                            Dolor sit amet consectetur adipisicing elit. Libero at autem blanditiis itaque sunt voluptatem aliquam dolorum dolorem tempora sit placeat, minus ipsam amet,
                            dolor consequatur vero aperiam inventore. Voluptatum! Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </Text>
                        <Text>
                            A cras semper auctor neque vitae tempus. Proin libero nunc consequat interdum varius sit. Viverra ipsum nunc aliquet bibendum enim facilisis. Magna etiam tempor
                            orci eu lobortis. Ut venenatis tellus in metus vulputate eu. Dictum varius duis at consectetur lorem donec massa sapien. Sed cras ornare arcu dui vivamus.
                            Ullamcorper velit sed ullamcorper morbi tincidunt. Tristique magna sit amet purus. Nibh praesent tristique magna sit amet purus gravida quis blandit. Nunc
                            lobortis mattis aliquam faucibus purus in massa tempor nec. Vel pharetra vel turpis nunc eget lorem dolor. Laoreet id donec ultrices tincidunt. Integer eget
                            aliquet nibh praesent tristique.
                        </Text>
                    </InformationalScreen.Content>
                </InformationalScreen.Page>
                <InformationalScreen.Page>
                    <InformationalScreen.Content>
                        <Text>
                            Diam maecenas sed enim ut. Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Quis enim lobortis scelerisque fermentum dui. Luctus accumsan tortor
                            posuere ac ut consequat semper viverra nam. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Egestas erat imperdiet sed
                            euismod nisi porta lorem mollis aliquam. Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui. Congue nisi vitae suscipit tellus mauris a
                            diam maecenas sed. Mauris commodo quis imperdiet massa. Tortor id aliquet lectus proin nibh nisl. Interdum velit euismod in pellentesque massa placerat. Augue
                            lacus viverra vitae congue eu consequat ac felis. Penatibus et magnis dis parturient montes nascetur ridiculus mus. Sed turpis tincidunt id aliquet risus feugiat.
                            Nullam vehicula ipsum a arcu cursus. Elementum integer enim neque volutpat ac tincidunt. Facilisi cras fermentum odio eu feugiat pretium.
                        </Text>
                        <Text>
                            Dolor sit amet consectetur adipisicing elit. Libero at autem blanditiis itaque sunt voluptatem aliquam dolorum dolorem tempora sit placeat, minus ipsam amet,
                            dolor consequatur vero aperiam inventore. Voluptatum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero at autem blanditiis itaque sunt voluptatem
                            aliquam dolorum dolorem tempora sit placeat, minus ipsam amet, dolor consequatur vero aperiam inventore. Voluptatum!
                        </Text>
                    </InformationalScreen.Content>
                    <InformationalScreen.Footer>
                        <Text>Page {index + 1} of 4. Lorem ipsum dolor sit amet.</Text>
                        <Stack
                            flexDirection="row"
                            gap="$4"
                        >
                            <Button
                                label="Back"
                                flexGrow={1}
                                onPress={onPrev}
                                variant="secondary"
                            />
                            <Button
                                label="Done"
                                flexGrow={1}
                                onPress={onClose}
                            />
                        </Stack>
                    </InformationalScreen.Footer>
                </InformationalScreen.Page>
            </InformationalScreen>
        </>
    );
}
